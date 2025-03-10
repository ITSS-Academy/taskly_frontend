import {CommentModel} from '../../models/comment.model';

export interface CommentState {
  comments: CommentModel[];
  isGettingComments: boolean;
  isGetCommentsSuccess: boolean;
  isGetCommentsFailure: string;

  isCreatingComment: boolean;
  isCreateCommentSuccess: boolean;
  isCreateCommentFailure: string;

  isDeletingComment: boolean;
  isDeleteCommentSuccess: boolean;
  isDeleteCommentFailure: string;
}
