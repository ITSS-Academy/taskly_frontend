import {CommentModel} from '../../../../../../donezo_frontend/src/app/models/comment.model';

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
