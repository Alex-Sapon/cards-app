import Button from "../../common/button/Button";
import Checkbox from "../../common/checkbox/Checkbox";
import EditableSpan from "../../common/editableSpan/EditableSpan";
import Range from "../../common/range/Range";
import Select from "../../common/select/Select";
import styles from './Test.module.css';
import InputText from "../../common/inputText/InputText";

export const Test = () => {
    return (
        <div>
            <h2>Universal components</h2>
            <h4>Button</h4>
            <Button>Button</Button>
            <h4>Checkbox</h4>
            <Checkbox/>
            <h4>EditableSpan</h4>
            <EditableSpan value={'Editable text...'} className={styles.editable_text}/>
            <h4>InputText</h4>
            <InputText/>
            <h4>Range</h4>
            <Range/>
            <h4>Select</h4>
            <Select/>
        </div>
    )
}