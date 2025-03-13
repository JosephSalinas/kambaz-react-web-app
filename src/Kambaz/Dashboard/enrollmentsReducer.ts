import { createSlice } from "@reduxjs/toolkit";
import { enrollments as initialEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState: { enrollments: initialEnrollments },
    reducers: {
        enroll: (state, { payload }) => {
            state.enrollments.push({
                _id: uuidv4(),
                user: payload.userId,
                course: payload.courseId,
            });
        },
        unenroll: (state, { payload }) => {
            state.enrollments = state.enrollments.filter(
                (e) => !(e.user === payload.userId && e.course === payload.courseId)
            );
        }
    },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
