import { Node } from 'ts-morph';

import { eachCall, memberName, renameMember, type RewriteRule, unhandled } from '../rule';

/**
 * v4 has one `HttpClientError` tag carrying a `reason`; v3 splits it into
 * `RequestError` and `ResponseError`. Catching the single v4 tag therefore means
 * catching everything the v3 client can fail with.
 */
export const catchAllErrors = (): RewriteRule => ({
  name: 'http-client-catch-tag',
  claims: ['HttpClient.catchTag'],
  apply: (file) =>
    eachCall(file, (call) => {
      if (memberName(call, 'HttpClient') !== 'catchTag') return;
      const [tag, handler, ...rest] = call.getArguments();
      if (tag === undefined || handler === undefined || rest.length > 0) {
        unhandled(call, 'HttpClient.catchTag outside the (tag, handler) form');
      }
      if (!Node.isStringLiteral(tag) || tag.getLiteralValue() !== 'HttpClientError') {
        unhandled(tag, 'HttpClient.catchTag on a tag other than `HttpClientError`');
      }
      call.replaceWithText(`HttpClient.catchAll(${handler.getText()})`);
    }),
});

/** `delete` is a reserved word, so v3 spells the request constructor `del`. */
export const deleteRequest = (): RewriteRule => ({
  name: 'http-client-request-delete',
  claims: ['HttpClientRequest.delete'],
  apply: (file) => renameMember(file, 'HttpClientRequest', 'delete', 'del'),
});
