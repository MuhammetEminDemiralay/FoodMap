import React, { useEffect, useState } from 'react'
import ProfileBox from '../../../component/profile'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFollowedList, getFollowerList } from '../../../redux/followSlice';
import { getUser } from '../../../redux/userSlice';
import { getUserPostImage } from '../../../redux/fileSlice';
import { getUserPost } from '../../../redux/postSlice';

const FriendDetailScreen = () => {

    const dispatch: any = useDispatch();
    const navigation: any = useNavigation();

    const { followerSize, followedSize } = useSelector((state: any) => state.follow)

    const { currentUser } = useSelector((state: any) => state.user)
    const { userPosts } = useSelector((state: any) => state.post)
    const { userPostImages, userPostState } = useSelector((state: any) => state.file)

    const [newData, setNewData] = useState<any>([])
    const [profileImageEditActive, setProfileImageEditActive] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            setNewData([])

            await dispatch(getFollowerList());
            await dispatch(getFollowedList());

            await dispatch(getUser());
            await dispatch(getUserPostImage());
            await dispatch(getUserPost());
        };

        fetchData();

    }, [followedSize, followerSize]);

    useEffect(() => {
        let data: any[] = []
        userPosts?.post?.forEach((post: any) => {
            const fileData = userPostImages?.find((postImage: any) => postImage.documentId == post.documentId)
            data.push({ postData: post, fileData: fileData })
        })
        setNewData(data)

    }, [userPostImages]);

    const refresh = () => {
        dispatch(getFollowerList())
        dispatch(getFollowedList())
        dispatch(getUser())
    }




    return (
        <>
            <ProfileBox
                currentUser={currentUser}
                profileImageEditActive={profileImageEditActive}
                setProfileImageEditActive={setProfileImageEditActive}
                followerSize={followerSize}
                followedSize={followedSize}
                userPostImages={userPostImages}
                newData={newData}
                refresh={refresh}
            />
        </>
    )
}

export default FriendDetailScreen
