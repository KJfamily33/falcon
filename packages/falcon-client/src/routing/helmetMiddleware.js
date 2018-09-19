import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { APP_INIT } from '../graphql/config.gql';
import UberHelmet from './../components/UberHelmet';

/**
 * Head Rendering middleware.
 * @return {function(ctx: object, next: function): Promise<void>} Koa middleware
 */
export default () => async (ctx, next) => {
  const { client } = ctx.state;
  const { config } = client.readQuery({ query: APP_INIT });

  const markup = <UberHelmet htmlLang={config.i18n.lng} />;
  renderToString(markup);

  ctx.state.helmetContext = Helmet.renderStatic();

  return next();
};
