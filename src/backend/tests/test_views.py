import pytest
from flask import g, session


def test_add_url(client, app):
    data = {
        "url": "https://www.youtube.com",
        "name": "Youtube"
    }
    response = client.post(
        '/', data=data
    )
    assert response.status_code == 200
    KEYS = [
        'name',
        'url'
    ]
    assert all([key in response.get_json().keys() for key in KEYS])

    # Test prevent duplicated urls
    response = client.post(
        '/', data=data
    )
    assert response.status_code == 500


def test_list_urls(client, app):
    test_add_url(client=client, app=app)
    response = client.get('/')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1

    return data[0]


def test_detail_url(client, app):
    data = test_list_urls(client=client, app=app)
    KEYS = [
        'name',
        'url'
    ]
    assert all([key in data.keys() for key in KEYS])

    url = data['url']
    response = client.get(url)
    assert response.status_code == 302
