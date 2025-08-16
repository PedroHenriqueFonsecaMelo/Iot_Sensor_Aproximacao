import flask
import math

app = flask.Flask(__name__)

@app.route("/")
def index():
    return flask.render_template("index.html")

@app.route("/calcular", methods=["POST"])
def calcular():
    data = flask.request.get_json()
    mouse_x = data["mouse_x"]
    mouse_y = data["mouse_y"]
    sensor_x = data["sensor_x"]
    sensor_y = data["sensor_y"]

    dx = mouse_x - sensor_x
    dy = mouse_y - sensor_y
    distancia = math.sqrt(math.pow(dx,2) + math.pow(dy,2))

    if distancia <= 100:
        cor = "vermelho"
    elif distancia <= 200:
        cor = "amarelo"
    else:
        cor = "verde"
    return flask.jsonify({"distancia":round(distancia),"cor":cor})

if __name__ == "__main__":
    app.run()
