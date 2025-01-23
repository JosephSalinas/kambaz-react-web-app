export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <br />
            <br />
            <input id="wd-name" value="A1 - ENV + HTML" />
            <br />
            <br />
            <textarea
                id="wd-description"
                rows={8}
                cols={50}
            >
                The assignment is available online. Submit a link to the landing page of
                your web application running on Netlify. The landing page should include
                the following: Your full name and section, links to each of the lab
                assignments, links to the Kambaz application, and links to all relevant
                source code repositories. The Kambaz application should include a link
                to navigate back to the landing page.
            </textarea>
            <br />
            <table>
                <tbody>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" type="number" value={100} />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select id="wd-group">
                                <option value="assignments">ASSIGNMENTS</option>
                                <option value="quizzes">Quizzes</option>
                                <option value="projects">Projects</option>
                            </select>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select id="wd-display-grade-as">
                                <option value="percentage">Percentage</option>
                                <option value="points">Points</option>
                                <option value="complete/incomplete">Complete/Incomplete</option>
                            </select>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select id="wd-submission-type">

                                <option value="online">Online</option>
                                <option value="on-paper">On Paper</option>
                            </select>
                            <br /><br />
                            <label>
                                <input id="wd-text-entry" type="checkbox" />
                                Text Entry
                            </label>
                            <br />
                            <label>
                                <input id="wd-website-url" type="checkbox" />
                                Website URL
                            </label>
                            <br />
                            <label>
                                <input id="wd-media-recordings" type="checkbox" />
                                Media Recordings
                            </label>
                            <br />
                            <label>
                                <input id="wd-student-annotation" type="checkbox" />
                                Student Annotation
                            </label>
                            <br />
                            <label>
                                <input id="wd-le-upload" type="checkbox" />
                                File Uploads
                            </label>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign to</label>
                        </td>
                        <td>
                            <input id="wd-assign-to" type="text" value="Everyone" />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                        <td>
                            <input id="wd-due-date" type="date" value="2024-05-13" />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-from">Available from</label>
                        </td>
                        <td>
                            <input id="wd-available-from" type="date" value="2024-05-06" />
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-until">Until</label>
                        </td>

                        <td>
                            <input id="wd-available-until" type="date" value="2024-05-28" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <hr></hr>
            <button type="button">Cancel</button>
            <button type="button">Save</button>
        </div>
    );
}
