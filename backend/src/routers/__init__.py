from .users import router as users_router  # noqa: F401
from .categories import router as categories_router  # noqa: F401
from .prompts import router as prompts_router  # noqa: F401
from .health import router as health_router  # noqa: F401
from .auth import router as auth_router, get_current_user  # noqa: F401
from .admin import router as admin_router  # noqa: F401  # noqa: F401

