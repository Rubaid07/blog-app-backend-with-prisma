import express from "express";
import { CommentController } from "./comment.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.get(
    "/author/:authorId",
    CommentController.getCommentByAuthor
)

router.get(
    "/:commentId",
    CommentController.getCommentById
)

router.post(
    "/",
    auth(UserRole.USER, UserRole.ADMIN), 
    CommentController.createComment
)

router.delete(
    "/:commentId",
    auth(UserRole.USER, UserRole.ADMIN), 
    CommentController.deleteComment
)

router.patch(
    "/:commentId",
    auth(UserRole.USER, UserRole.ADMIN), 
    CommentController.updateComment
)

router.patch(
    "/:commentId/moderate",
    auth(UserRole.ADMIN), 
    CommentController.moderateComment
)

export const commentRouter = router;