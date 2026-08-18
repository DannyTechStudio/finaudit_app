from django.conf import settings

ACCESS_COOKIE_NAME = "access_token"
REFRESH_COOKIE_NAME = "refresh_token"


def set_auth_cookies(response, access_token, refresh_token):
    
    response.set_cookie(
        key=ACCESS_COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=True,
        samesite="None",
        max_age=5 * 60,
        path="/",
    )
    
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="None",
        max_age=7 * 24 * 60 * 60,
        path="/api/auth/token/refresh/",
    )


def delete_auth_cookies(response):
    response.delete_cookie(
        ACCESS_COOKIE_NAME,
        path="/",
    )

    response.delete_cookie(
        REFRESH_COOKIE_NAME,
        path="/api/auth/token/refresh/",
    )





