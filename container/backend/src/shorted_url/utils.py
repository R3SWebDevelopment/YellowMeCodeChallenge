import contextlib
from urllib.parse import (
    urlencode,
    parse_qsl,
)
from urllib.request import urlopen


def make_tiny(url):
    """
    This method received a URL and make a request to generate a shorted version using tinyurl
    """
    request_url = ('http://tinyurl.com/api-create.php?' + urlencode({'url':url}))
    with contextlib.closing(urlopen(request_url)) as response:
        return response.read().decode('utf-8')


def get_parameters(querystring):
    data = {
        str(key).replace("b'", "").replace("'", ""): str(value).replace("b'", "").replace("'", "")
        for key, value in parse_qsl(querystring)
    }
    return data