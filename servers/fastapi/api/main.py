from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.lifespan import app_lifespan
from api.middlewares import UserConfigEnvUpdateMiddleware
from api.v1.ppt.router import API_V1_PPT_ROUTER
from utils.asset_directory_utils import get_images_directory, get_uploads_directory
from utils.get_env import get_app_data_directory_env
from fastapi.staticfiles import StaticFiles
import os



app = FastAPI(lifespan=app_lifespan)


# Routers
app.include_router(API_V1_PPT_ROUTER)

# Ensure images folder exists at startup
get_images_directory()

# Ensure uploads folder exists
get_uploads_directory()

# Get app_data directory
app_data_dir = get_app_data_directory_env() or "./app_data"

# Mount static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Mount app_data directory for uploads
app.mount("/app_data", StaticFiles(directory=app_data_dir), name="app_data")


# Middlewares
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(UserConfigEnvUpdateMiddleware)
