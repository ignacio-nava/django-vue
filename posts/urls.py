from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    PostsListView, 
    PostCreateView,
    PostDetailView,
    PostsAPIView, 
)

router = DefaultRouter()
router.register(r"posts", PostsAPIView, "posts")

app_name = "posts"
urlpatterns = [
    path('', PostsListView.as_view(), name="home"),
    path('posts/create/', PostCreateView.as_view(), name="create"),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    # API Urls
    path('api/', include(router.urls))
]
