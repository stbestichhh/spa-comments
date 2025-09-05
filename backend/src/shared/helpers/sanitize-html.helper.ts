import * as sanitizeHtml from 'sanitize-html';

export const sanitizeCommentText = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: ['a', 'code', 'i', 'strong'],
    allowedAttributes: {
      a: ['href', 'title'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    disallowedTagsMode: 'discard',
    enforceHtmlBoundary: true,
  });
};
