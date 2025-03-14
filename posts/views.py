from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import View, DetailView, FormView

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Post
from .forms import CreatePostForm
from .serializers import PostSerializer


TEMPLATE_FOLDER_NAME = 'posts'

class PostsListView(View):
    template_name = f"{TEMPLATE_FOLDER_NAME}/post_list.html"
    def get(self, request):
        return render(request, self.template_name, {})

class PostDetailView(DetailView):
    model = Post
    template_name = f'{TEMPLATE_FOLDER_NAME}/post_detail.html'
    context_object_name = 'post'

# class PostAddView():

class PostCreateView(LoginRequiredMixin, FormView):
    model = Post
    template_name = f"{TEMPLATE_FOLDER_NAME}/post_form.html"
    success_url = reverse_lazy('posts:home')

    def get(self, request, pk=None):
        form = CreatePostForm()
        context = {
            'form': form
        }
        return render(request, self.template_name, context)
    
    def post(self, request, *args, **kwargs):
        form = CreatePostForm(request.POST)
        if not form.is_valid():
            context = {
                "form": form
            }
            return render(request, self.template_name, context)
        post = form.save(commit=False)
        post.owner = request.user
        post.save()
        return redirect(self.success_url)


# API VIEWS

class PostsAPIView(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def update(self, request, *args, **kwargs):
        post = self.get_object()

        if post.owner != request.user:
            raise PermissionDenied("This isn't your POST, machine")
        
        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        post = self.get_object()

        if post.owner != request.user:
            raise PermissionDenied("This isn't your POST, machine")
        
        return super().destroy(request, *args, **kwargs)