from flask import (
    Blueprint
)
from flask import (
    abort,
    request,
    jsonify,
    redirect,
)
from .db import (
    get_db,
)
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
    urls = data.get('urls', [])
    if len(urls) == 0 and (name is None or url is None):
        abort(500, "Bad Parameters")
    is_raise_allows = len(urls) == 0
    if is_raise_allows:
        urls.append(
            {
                "name": name,
                "url": url
            }
        )
    response_data = []
    for item in urls:
        item_url = item.get('url', None)
        item_name = item.get('url', None)
        if item_url is not None and item_name is not None:
            shorted_url = make_tiny(url=item_url)
            shorted_url_id = shorted_url.replace("https://tinyurl.com/", "")

            db = get_db()
            try:
                db.execute(
                    'INSERT INTO shorted_url (name, url, shorted_url, shorted_id) VALUES (?, ?, ?, ?)',
                    (item_name, item_url, shorted_url, shorted_url_id)
                )
                db.commit()
                response_data.append(
                    {
                        "name": item_name,
                        "url": "{}{}".format(request.host_url, shorted_url_id)
                    }
                )
            except:
                if is_raise_allows:
                    abort(500, "Duplicated not Allow")

    response = response_data[0] if is_raise_allows else response_data
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
