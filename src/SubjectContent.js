import "./SubjectContent.css"
import Fade from "react-reveal/Fade";
import Post from "./Post";
import {useState} from "react";

function SubjectContent(props) {

    let postsToRender = ''

    const [ticker, updateTick] = useState(0)

    if (props.subject != -1) {
        postsToRender = JSON.parse(localStorage['posts']).map((p, i) => {
            if (p[0] == props.subject) {
                return (
                    <Post key={i.toString()} id={i} post={p} updater={updateTick} tick={ticker}/>
                )
            }
        })
    }

    function addPost() {
        localStorage['posts'] = JSON.stringify([[props.subject, new Date(), false, 'Новая запись']].concat(JSON.parse(localStorage['posts'])))
        updateTick(ticker + 1)
    }

    if (props.subject == -1) {
        return (
            <Fade>
                <div className={`row center-align grey-text notification`}>
                    <div className={`col s12 m12 l12`}>
                        <i className={`material-icons medium`}>edit</i>
                        <h5>Выберите категорию</h5>
                    </div>
                </div>
            </Fade>
        )
    } else {
        return (
            <div className={`row left-align`}>
                <div className={`col s12 m12 l12`}>
                    <ul className={`collection`}>
                        <a onClick={addPost} className={`collection-item blue-text add-post-button`}><i
                            className={`material-icons left blue-text`}>add</i> Новая запись</a>
                        {postsToRender}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SubjectContent