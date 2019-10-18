import React, { useState } from "react";
import {axiosWithAuth} from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({colors, updateColors }) => {
  console.log('color list data', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false)
  const [addColor, setAddColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('put response', res)
        updateColors(res.data) 
        setEditing(false)             
      })
      .then (()=> {
        axiosWithAuth().get(`/api/colors`).then(res=> {updateColors(res.data)})
       })
      .catch(err => console.log('color-put error', err.response))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then(res=> {
        console.log('delete response', res)
        updateColors(res.data)
        setEditing(false)
          
      })
      .then (()=> {
        axiosWithAuth().get(`/api/colors`).then(res=> {updateColors(res.data)})
      })
      .catch(err => console.log('delete error', err.response))
  };

  const newColor = () => {
    setAdding(true)
  }

  const addNewColor = e => {
    axiosWithAuth()
      .post('/api/colors', addColor)
      .then(res => {
        updateColors(res.data)
      })
      .catch(err => console.log('add new color error', err.response))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={newColor}>Add Color</button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {adding && (
      <form onSubmit={addNewColor}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
        )}
    </div>
  );
};

export default ColorList;
