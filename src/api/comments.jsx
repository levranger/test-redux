/* eslint-disable camelcase */
import { request, post } from './helpers';

export const getComments = async(id) => {
  const comments = await request(`/comments/${id}/`);

  return comments;
};

export const addComment = async(name, comment, image_id) => post(
  `/images/${image_id}/comments/`, {
    name,
    comment,
  },
);
