import { renameMember, type RewriteRule } from '../rule';

/** v4 `Layer.unwrap` only unwraps an effect; v3 names that case explicitly. */
export const unwrapEffect = (): RewriteRule => ({
  name: 'layer-unwrap',
  claims: ['Layer.unwrap'],
  apply: (file) => renameMember(file, 'Layer', 'unwrap', 'unwrapEffect'),
});
