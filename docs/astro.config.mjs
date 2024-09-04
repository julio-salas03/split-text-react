import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://julio-salas03.github.io',
  base: 'split-text-react',
  integrations: [
    starlight({
      title: 'Split Text React Docs',
      social: {
        github: 'https://github.com/julio-salas03/split-text-react',
      },
      sidebar: [
        {
          label: 'Home',
          slug: '',
        },
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
