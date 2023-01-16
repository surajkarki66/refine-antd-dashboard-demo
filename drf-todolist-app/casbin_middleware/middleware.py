import casbin
import os

from pathlib import Path
from django.core.exceptions import PermissionDenied


class CasbinMiddleware:
    """
    Casbin middleware.
    """

    def __init__(self):

        BASE_DIR = Path(__file__).resolve().parent
        auth_model_dir = BASE_DIR.joinpath("./auth_model.conf")
        auth_policy_dir = BASE_DIR.joinpath("./auth_policy.csv")

        self.enforcer = casbin.Enforcer(
            str(auth_model_dir), str(auth_policy_dir))

    def check_permission(self, role, path, action):
        return self.enforcer.enforce("admin", "dashboard", "list")
