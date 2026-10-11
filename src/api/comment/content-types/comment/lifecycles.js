'use strict';

/**
 * Lifecycle hooks for the Comment content type.
 *
 * Public visitors submit comments via the public API (see permissions setup
 * in SETUP.md). We never trust a client-supplied `moderationStatus` value:
 * every new comment is forced to 'pending' here, so moderation can only
 * happen from the Strapi Admin panel (Content Manager -> Comment -> filter
 * by moderationStatus).
 *
 * The field is named `moderationStatus`, not `status` — see the
 * description on that field in schema.json for why: a confirmed Strapi 5
 * Admin panel bug (strapi/documentation#2293) breaks any custom
 * enumeration field literally named "status".
 *
 * There is deliberately no beforeUpdate hook here. The Public role is
 * never granted `update` on Comment (see SETUP.md), so the permissions
 * system alone already blocks a visitor from self-approving their own
 * comment via the API — a beforeUpdate lock here would be redundant, and
 * an earlier version of this file proved it's also easy to get wrong
 * (it silently broke legitimate admin edits).
 */

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.moderationStatus = 'pending';
  },
};
