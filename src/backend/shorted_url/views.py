from flask import (
    Blueprint
)

bp = Blueprint('Shorted URL', __name__, url_prefix='/')


@bp.route('/', methods=['POST'])
def add_url():
    """
    This view receives a URL and Name, the URL is shorted and added to the list
    :return: The Shorted URL
    """
    return "HOLA POST"


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
    return "HOLA GET"


@bp.route('/<shorted_url>', methods=['GET'])
def detail_url(shorted_url=None):
    """
    This view received a shorted_url, look it for on the stored list, if exists redirect to the actual URL otherwise
    Return a 404 Error
    :param shorted_url:
    :return:
    """
    pass
