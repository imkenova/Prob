import "./AddSubjectModal.css"
import Fade from "react-reveal/Fade"
import {useState} from "react";

function AddSubjectModal(props) {

    const [name, editName] = useState('')
    const [errorMsg, editErrorMsg] = useState('')

    function addSubject(e) {
        e.stopPropagation()
        if (name.replace(/ /g, '').length != 0 && JSON.parse(localStorage['subjects']).indexOf(name) == -1) {
            localStorage['subjects'] = JSON.stringify(JSON.parse(localStorage['subjects']).concat(name))
            props.changeVisibility(false)
            editErrorMsg('')
        } else {
            editErrorMsg('Поле пустое, либо предмет с такой же категорией уже существует')
        }
    }

    function preventHiding(e) {
        e.stopPropagation()
    }

    function hideModal(e) {
        props.changeVisibility(false)
        editErrorMsg('')
    }

    function keyPress(e){
        if (e.key == "Enter"){
            addSubject(e)
        }
    }

    if (props.visible)
        return (
            <div className="modalWrapper" onClick={hideModal}>
                <Fade>
                    <div className="modal" onClick={preventHiding}>
                        <div className="modal-content">
                            <h4 className="blue-text">Добавить категорию</h4>
                            <input autoFocus={true} type="text" maxLength="64" placeholder="Введите название категории" onChange={(e) => {
                                editName(e.target.value)
                            }} onKeyPress={keyPress}/>
                            {errorMsg.length > 0 && <span className="red-text">{errorMsg}</span>}
                        </div>
                        <div className="modal-footer">
                            <button className="btn blue white-text" onClick={addSubject}>Добавить</button>
                        </div>
                    </div>
                </Fade>
            </div>
        )
    else
        return ('')
}

export default AddSubjectModal