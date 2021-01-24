from flask import (
    Blueprint
)
from flask import (
    abort,
    request,
    jsonify,
    redirect,
)
from .db import get_db
from .utils import (
    make_tiny,
    get_parameters,
)

bp = Blueprint('Shorted URL', __name__, url_prefix='/')


@bp.route('/', methods=['POST'])
def add_url():
    """
    This view receives a URL and Name, the URL is shorted and added to the list
    :return: The Shorted URL
    """
    data = request.json or get_parameters(request.get_data())
    name = data.get('name', None)
    url = data.get('url', None)
    if name is None or url is None:
        abort(500, "Bad Parameters")
    shorted_url = make_tiny(url=url)
    shorted_url_id = shorted_url.replace("https://tinyurl.com/", "")

    db = get_db()
    try:
        db.execute(
            'INSERT INTO shorted_url (name, url, shorted_url, shorted_id) VALUES (?, ?, ?, ?)',
            (name, url, shorted_url, shorted_url_id)
        )
        db.commit()
    except:
        abort(500, "Duplicated not Allow")

    response = {
        "name": name,
        "url": "{}{}".format(request.host_url, shorted_url_id)
    }
    return jsonify(response)


@bp.route('/', methods=['GET'])
def list_urls():
    """
    This view list all the shorted URL stored on the following format
    [
        {
            "name": String,
            "url": URL (http://<api>/<shorted_url>)
        }
    ]
    :return:
    """

    response = []
    db = get_db()
    items = db.execute(
        'SELECT name, shorted_id FROM shorted_url'
    ).fetchall()
    for item in items:
        response.append(
            {
                "name": item['name'],
                "url": "{}{}".format(request.host_url, item['shorted_id'])
            }
        )
    return jsonify(response)


@bp.route('/<shorted_url>', methods=['GET'])
def detail_url(shorted_url=None):
    """
    This view received a shorted_url, look it for on the stored list, if exists redirect to the actual URL otherwise
    Return a 404 Error
    :param shorted_url:
    :return:
    """
    db = get_db()
    item = db.execute(
        'SELECT url FROM shorted_url WHERE shorted_id = ?',
        (shorted_url, )
    ).fetchone()
    if item is None:
        abort(404, "URL Not Found")
    return redirect(item['url'], code=302)
