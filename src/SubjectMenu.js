import "./SubjectMenu.css"
import {useState} from "react";
import Slide from "react-reveal/Slide";
import AddSubjectModal from "./AddSubjectModal";
import ContextMenu from "./ContextMenu";

function SubjectMenu(props) {

    const [modalVisible, setModalVisible] = useState(false)
    const [contextMenuOpened, editContextMenuOpened] = useState(false)
    const [contextMenuSelectedSubject, editContextMenuSelectedSubject] = useState(-1)
    const [contextMenuPosition, editContextMenuPosition] = useState([0, 0])

    let subjects = JSON.parse(localStorage['subjects'])
    let renderedSubjects

    function switchModal() {
        setModalVisible(true)
    }

    function selectSubject(s) {
        props.editSelectedSubject(s)
    }

    renderedSubjects = subjects.map((s, i) => {
        if (s != null)
            return (
                <Slide right key={s.toString()}>
                    <div className="card grey lighten-5 blue-text hoverable valign-wrapper" onContextMenu={(e) => {
                        e.preventDefault();
                        editContextMenuSelectedSubject(i);
                        editContextMenuPosition([e.clientX, e.clientY])
                        editContextMenuOpened(true)
                    }} onClick={() => {
                        selectSubject(i)
                    }}>
                        <div
                            className={`card-content center-align truncate ${props.selectedSubject == i ? 'active' : ''}`}>
                            {s}
                        </div>
                    </div>
                </Slide>
            )
    })

    return (
        <div>
            <AddSubjectModal visible={modalVisible} changeVisibility={setModalVisible}/>
            <ContextMenu opened={contextMenuOpened} editOpened={editContextMenuOpened}
                         subject={contextMenuSelectedSubject} editSelectedSubject={props.editSelectedSubject}
                         cursorPos={contextMenuPosition}
            />
            <div className="row left-align subjects-band">
                <Slide right>
                    <div className="card blue white-text hoverable valign-wrapper" onClick={switchModal}>
                        <div className="card-content center-align">
                            <i className="material-icons medium white-text">add</i>
                        </div>
                    </div>
                </Slide>
                {renderedSubjects}
            </div>
        </div>
    )
}

export default SubjectMenu