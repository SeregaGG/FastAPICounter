from fastapi import FastAPI, WebSocket, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/templates", StaticFiles(directory="templates"), name="templates")
app.mount("/js", StaticFiles(directory="js"), name="js")
templates = Jinja2Templates(directory="templates")

bad_gl_list = []  # without db


@app.get("/")
def get(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    bad_gl_list.append(websocket)
    counter = 0
    while True:
        data = await websocket.receive_json()
        counter += 1
        response_body = {
            'counter': counter,
            'message': data['message'],
            'sender_id': bad_gl_list.index(websocket)
        }
        for i, ws in enumerate(bad_gl_list):
            response_body.update({'receiver_id': i})
            try:
                await ws.send_json(response_body)
            except:
                bad_gl_list.remove(ws)
