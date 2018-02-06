import * as crypto from 'crypto';
import * as express from 'express';
import * as prepareArgs from 'minimist';
import * as proxyMiddleware from 'http-proxy-middleware';
import * as path from 'path';
import {existsSync, readdirSync, unlinkSync, statSync} from 'fs';
import {
  FuseBox,
  SVGPlugin,
  CSSPlugin,
  UglifyJSPlugin,
  TypeScriptHelpers,
  SassPlugin,
  JSONPlugin,
  EnvPlugin,
  WebIndexPlugin,
  HTMLPlugin,
  FuseBoxOptions,
  QuantumPlugin,
  ImageBase64Plugin, CSSResourcePlugin,
} from 'fuse-box';

// CONFIGURATION
// -------------------------------------------------

const DIST_FOLDER = 'build';
const MAIN_BUNDLE = `main-${getShortRandomString()}`;
const ENTRY = '> index.tsx';
const DEFAULT_ENV = {
  LAST_FM_API_KEY: process.env.LAST_FM_API_KEY,
  LAST_FM_API_URL: 'https://ws.audioscrobbler.com/2.0/'
};
const DEFAULT_CONFIG: FuseBoxOptions = {
  homeDir: "src",
  target: 'browser',
  output: `${DIST_FOLDER}/$name.js`,
  plugins: [
    JSONPlugin(),
    ImageBase64Plugin(),
    SVGPlugin(),
    WebIndexPlugin({
      title: "Maple UI",
      template: "src/index.html"
    }),
    CSSPlugin(),
    [
      SassPlugin(),
      CSSResourcePlugin({
        resolve: file => `/resources/${file}`,
        dist: `${DIST_FOLDER}/resources/`,
      }),
      CSSPlugin(),
    ] as any,
    HTMLPlugin({useDefault: false}),

  ],
  shim: {
    axios: {
      source: 'node_modules/axios/dist/axios.min.js',
      exports: 'axios'
    }
  }
};
const config: { [env: string]: FuseBoxOptions } = {
  dev: {
    sourceMaps: true,
    plugins: [
      EnvPlugin({
        ...DEFAULT_ENV,
        API_URL: '/api',
        NODE_ENV: 'development',
      }),
      ...DEFAULT_CONFIG.plugins
    ]
  },
  qa: {
    plugins: [
      EnvPlugin({
        ...DEFAULT_ENV,
        API_URL: '/api',
        NODE_ENV: 'production',
      }),
      ...DEFAULT_CONFIG.plugins,
      UglifyJSPlugin({})
    ],
  },
  prod: {
    plugins: [
      EnvPlugin({
        ...DEFAULT_ENV,
        API_URL: '/api',
        NODE_ENV: 'production',
      }),
      ...DEFAULT_CONFIG.plugins,
      UglifyJSPlugin({fromString: true}),
      QuantumPlugin({
        uglify: true,
        treeshake: true,
      })
    ],
    alias: {
      'react-dom': 'react-dom/umd/react-dom.production.min',
      'react': 'react/umd/react.production.min',
      'react-router': 'react-router/umd/react-router.min',
      'glamor': 'glamor/umd/index.min',
      'recompose': 'recompose/build/Recompose.min',
    },
  }
};
const proxies = {
  default: 'http://localhost:3000'
};

function fuseBox(env) {
  if (!config[env]) {
    throw new Error(`Unknown environment name "${env}"`);
  }
  return FuseBox.init({...DEFAULT_CONFIG, ...config[env]});
}

// TASKS
// -------------------------------------------------

const tasks = {
  clearDist: function clearDist(currentPath = path.join(__dirname, DIST_FOLDER)) {
    if (!existsSync(currentPath)) return;
    readdirSync(currentPath)
    .forEach(name => {
      const fullPath = path.join(currentPath, name);
      if (!statSync(fullPath).isDirectory()) {
        unlinkSync(path.join(fullPath));
      } else {
        clearDist(fullPath);
      }
    })
    ;
  },
  serve(env, {proxy}) {
    this.clearDist();
    const fuse = fuseBox(env);

    fuse.dev({}, server => {
      const dist = path.resolve(`./${DIST_FOLDER}`);
      const app = server.httpServer.app;
      app.use(express.static(path.join(dist)));
      app.use('/api', proxyMiddleware({target: proxies[proxy], changeOrigin: true}));
      // ensure that any path redirects to index.html
      // so that refreshing in case of html5 routes
      // does not lead to a 404
      app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
    });

    fuse
    .bundle(MAIN_BUNDLE)
    .instructions(ENTRY)
    .watch().hmr()
    ;

    fuse.run();
  },
  build(env) {
    this.clearDist();
    const fuse = fuseBox(env);

    fuse
    .bundle(MAIN_BUNDLE)
    .instructions(ENTRY)
    ;

    fuse.run();
  }
};

// RUN TASKS
// -------------------------------------------------

// [0]    [1]       [2]               [3]
// node   fuse.js   serve|build|...  dev|prod
const args = prepareArgs(process.argv.slice(2), {
  alias: {
    proxy: 'p'
  },
  default: {
    proxy: 'default'
  }
});
const task = args._.shift();
tasks[task](...args._, args);

// HELPER
// -------------------------------------------------

function getShortRandomString() {
  const BYTES = 8;
  return crypto.randomBytes(BYTES).toString('hex');
}
