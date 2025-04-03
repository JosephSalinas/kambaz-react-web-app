import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export const enroll = async (userId: string, courseId: string) => {
    const response = await axios.post(`${REMOTE_SERVER}/api/enrollments`, { userId, courseId });
    return response.data;
};

export const unenroll = async (userId: string, courseId: string) => {
    const response = await axios.delete(`${REMOTE_SERVER}/api/enrollments`, {
        data: { userId, courseId },
    });
    return response.data;
};
