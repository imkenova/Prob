import "./Post.css"
import {useState} from "react";

function Post(props){

    const [postText, editPostText] = useState('')
    const [editMode, switchEditMode] = useState(false)

    let postDate = new Date(props.post[1])

    let postDay = postDate.getDate().toString().length < 2 ? '0' + postDate.getDate().toString() : postDate.getDate().toString()
    let postMonth = (postDate.getMonth() + 1).toString().length < 2 ? '0' + (postDate.getMonth() + 1).toString() : (postDate.getMonth() + 1).toString()
    let postHour = postDate.getHours().toString().length < 2 ? '0' + postDate.getHours().toString() : postDate.getHours().toString()
    let postMinute = postDate.getMinutes().toString().length < 2 ? '0' + postDate.getMinutes().toString() : postDate.getMinutes().toString()

    let dateRender = postDay + '.' + postMonth + '.' + postDate.getFullYear() + ' ' + postHour + ':' + postMinute

    let postStatus = ''

    if (props.post[2].toString() == "true"){
        postStatus = <div className={`green-text valign-wrapper`}><i className={`material-icons done`}>done</i>Завершено</div>
    }

    function removePost(){
        let extraction = JSON.parse(localStorage['posts'])
        extraction = extraction.filter((p, i) => i != props.id)
        localStorage['posts'] = JSON.stringify(extraction)
        props.updater(props.tick + 1)
    }

    function editPost(){
        if (editMode){
            let extraction = JSON.parse(localStorage['posts'])
            extraction[props.id][3] = postText
            localStorage['posts'] = JSON.stringify(extraction)
            props.updater(props.tick + 1)
        }
        switchEditMode(!editMode)
    }

    function markAsDone(){
        let extraction = JSON.parse(localStorage['posts'])
        extraction[props.id][2] = extraction[props.id][2].toString() == 'true' ? 'false' : 'true'
        localStorage['posts'] = JSON.stringify(extraction)
        props.updater(props.tick + 1)
    }

    function enterTextareaHandling(e){
        if (e.key == 'Enter'){
            e.preventDefault()
            editPost()
        }
    }

    return (
        <li className={`collection-item black-text ${props.post[2].toString() == "true" ? 'grey lighten-2' : ''}`}>
            <div className={`post-container`}>
                <div className={`post-text ${props.post[2].toString() == "false" ? 'black-text' : 'grey-text'} left-align`}>
                    {editMode && <textarea autoFocus onFocus={(e) => {editPostText(e.target.value)}} onChange={(e)=>{editPostText(e.target.value)}} onKeyDown={enterTextareaHandling} defaultValue={props.post[3]}></textarea>}
                    {!editMode && postStatus}
                    {!editMode && props.post[3]}
                </div>
                <div className={`post-actions grey-text`}>
                    <div className={`post-date`}>
                        {dateRender}
                    </div>
                    <div className={`post-btns right-align`}>
                        <span onClick={markAsDone} className={`blue-text`}>{props.post[2].toString() == 'true' ? 'Снять метку' : 'Отметить'}</span>
                        <span onClick={editPost} className={`blue-text`}>{editMode ? 'Сохранить' : 'Редактировать'}</span>
                        <span onClick={removePost} className={`red-text`}>Удалить</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Post