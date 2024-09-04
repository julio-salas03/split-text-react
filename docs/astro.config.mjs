import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Split Text React Docs',
      social: {
        github: 'https://github.com/julio-salas03/split-text-react',
      },
      sidebar: [
        {
          label: 'API',
          slug: 'api',
        },
        {
          label: 'Demos',
          slug: 'demos',
        },
      ],
    }),
  ],
});
