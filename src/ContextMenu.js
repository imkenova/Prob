import "./ContextMenu.css"
import Fade from "react-reveal/Fade";

function ContextMenu(props) {

    let style = {
        left: props.cursorPos[0],
        top: props.cursorPos[1]
    }

    function hideMenu() {
        props.editOpened(false)
    }

    function removeNow(e) {
        e.stopPropagation()

        props.editSelectedSubject(-1)

        let extraction = JSON.parse(localStorage['posts'])
        extraction = extraction.filter((p) => parseInt(p[0]) != parseInt(props.subject))
        localStorage['posts'] = JSON.stringify(extraction)

        extraction = JSON.parse(localStorage['subjects'])
        extraction[props.subject] = null
        localStorage['subjects'] = JSON.stringify(extraction)

        props.editOpened(false)
    }

    if (props.opened)
        return (
            <Fade>
                <div className={`menu-wrapper`} onClick={hideMenu} onContextMenu={(e) => e.preventDefault()}>
                    <div className={`menu-container`} style={style}>
                        <ul className={`collection`}>
                            <a onClick={removeNow} className={`collection-item blue-text`}><i
                                className={`material-icons red-text`}>delete</i> <span>Удалить категорию</span></a>
                        </ul>
                    </div>
                </div>
            </Fade>
        )
    else
        return ''
}

export default ContextMenu