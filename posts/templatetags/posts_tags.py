from os import path
import json

from django import template
from django.conf import settings
from django.templatetags.static import static
from django.utils.safestring import mark_safe


register = template.Library()

manifest_path = path.join(settings.STATICFILES_DIRS[0], 'js/.vite/manifest.json')


@register.simple_tag
def vue_tag(file_name):
    print(manifest_path)
    file_path = f'{settings.FRONTEND_SOURCE}entrypoints/{file_name}'
    if settings.DEBUG:
        return mark_safe(
            f'<script type="module" src="{settings.DEV_DOMAIN}{file_path}.ts"></script>')
    else:
        static_url = static(f'js/{file_name}.js')
        return mark_safe(f'<script type="module" crossorigin src="{static_url}"></script>')

@register.simple_tag
def global_vue_tag(file_name='entrypoints'):
    file_path = f'{settings.FRONTEND_SOURCE}{file_name}'
    if settings.DEBUG:
        return mark_safe(
            f'<script type="module" src="{settings.DEV_DOMAIN}{file_path}.ts"></script>')
    else:
        static_url = static(f'js/{file_name}.mSm8yCbR.js')
        return mark_safe(f'<script type="module" crossorigin src="{static_url}"></script>')