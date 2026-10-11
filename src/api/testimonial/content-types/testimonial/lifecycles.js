'use strict';

/**
 * See cms/src/api/comment/content-types/comment/lifecycles.js for the full
 * explanation of both the moderation approach and why this field is named
 * moderationStatus instead of status.
 */

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    data.moderationStatus = 'pending';
  },
};
