import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest, getFriendRequests, getoutgoingFriendRequest} from "../controllers/user.controller.js"

const router = express.Router()
router.use(protectRoute) // apply auth middleware to all routes

router.get("/", getRecommendedUsers)
router.get("/friends", getMyFriends)

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)
// Can add reject friend request

router.get("/friend-requests", getFriendRequests)
router.get("/outgoing-friend-requests", getoutgoingFriendRequest)

export default router