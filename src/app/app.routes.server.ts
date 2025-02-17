import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'example',
    renderMode: RenderMode.Client
  },
  {
    path: 'home',
    renderMode: RenderMode.Server
  },
  {
    path: 'users',
    renderMode: RenderMode.Client
  }
];
