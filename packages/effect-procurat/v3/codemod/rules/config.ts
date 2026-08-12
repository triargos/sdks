import { SyntaxKind } from 'ts-morph';

import { ensureNamedImport, type RewriteRule } from '../rule';

/** v4 hangs the failure type off `Config`; v3 keeps it in its own module. */
export const configErrorType = (): RewriteRule => ({
  name: 'config-error-type',
  claims: ['Config.ConfigError'],
  apply: (file) => {
    let found = false;
    for (const qualified of file.getDescendantsOfKind(SyntaxKind.QualifiedName).reverse()) {
      if (qualified.wasForgotten() || qualified.getText() !== 'Config.ConfigError') continue;
      qualified.replaceWithText('ConfigError.ConfigError');
      found = true;
    }
    if (found) ensureNamedImport(file, 'effect', 'ConfigError');
  },
});
