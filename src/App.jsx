import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { validate, getUsers } from "./utilities/function";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [nat, setNat] = useState("");
  const [isUpdate, setUpdate] = useState(false);
  const [updteId, setUpdateId] = useState("");
  useEffect(() => {
    let u = getUsers();
    setUsers(u);
  }, []);

  function handleRadio(value) {
    setNat(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validate(name, age, email, password, nat);

    if (isValid) {
      const user = {
        name: name,
        email: email,
        age: age,
        password: password,
        nat: nat,
        id: nanoid(),
        visible: false,
      };
      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setUsers(copied);
      setName("");
      setAge(0);
      setEmail("");
      setPass("");
    }
  }

  function handleShow(order, user) {
    let copied = JSON.parse(JSON.stringify(users));
    copied = copied.map((el) => {
      if (el.id === user.id && order === "show") {
        el.visible = true;
      }

      if (el.id === user.id && order === "hide") {
        el.visible = false;
      }
      return el;
    });
    setUsers(copied);
  }

  function handleDelete(user) {
    confirm("Are you sure you want to delete?");
    let filteredUsers = users.filter((u) => u.id !== user.id);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  }
  function handleUpdate() {
    if (updteId) {
      const isValid = validate(name, age, email, password, nat);

      if (isValid) {
        const user = {
          name: name,
          email: email,
          age: age,
          password: password,
          nat: nat,
          id: updteId,
          visible: false,
        };

        let copied = JSON.parse(JSON.stringify(users));
        copied = copied.map((el) => {
          if (el.id == updteId) {
            el = user;
          }
          return el;
        });
        setUsers(copied);
        localStorage.setItem("users", JSON.stringify(copied));
        setUpdate(false);
        setName("");
        setAge(0);
        setEmail("");
        setPass("");
      }
    }
  }

  function handleUpdateItem(user) {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setPass(user.password);
    setUpdate(user.password);
    setNat(user.nat);
    setUpdateId(user.id);
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-2">Users</h1>

        <form className="w-50 mx-auto d-flex flex-column gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control mx-auto"
            id="floatingInput"
            placeholder="Enter your name..."
          />

          <input
            type="number"
            className="form-control mx-auto"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
            id="floatingNumber"
          />

          <input
            type="email"
            className="form-control mx-auto"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="floatingEmail"
            placeholder="Enter your email..."
          />
          <input
            type="password"
            className="form-control mx-auto"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            id="floatPassword"
            placeholder="Enter your password..."
          />
          {
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="uzbek"
                  checked={nat == "uzbek" ? true : false}
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                  name="flexRadioDefault"
                  id="uzbek"
                />
                <label className="form-check-label" htmlFor="uzbek">
                  Uzbek
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="russian"
                  checked={nat == "russian" ? true : false}
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                  name="flexRadioDefault"
                  id="russian"
                />
                <label className="form-check-label" htmlFor="russian">
                  Russian
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="english"
                  checked={nat == "english" ? true : false}
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                  name="flexRadioDefault"
                  id="english"
                />
                <label className="form-check-label" htmlFor="english">
                  English
                </label>
              </div>
            </>
          }

          {!isUpdate && (
            <button onClick={handleSubmit} className="btn btn-primary">
              Save
            </button>
          )}
          {isUpdate && (
            <button onClick={handleUpdate} className="btn btn-success">
              Update
            </button>
          )}
        </form>

        <div className="users-wrapper mt-5">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Password</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex gap-3">
                          <span className="mt-1">
                            {user.visible ? user.password : "***"}
                          </span>
                          <span>
                            {user.visible ? (
                              <FaEye
                                onClick={() => {
                                  handleShow("hide", user);
                                }}
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <FaEyeSlash
                                onClick={() => {
                                  handleShow("show", user);
                                }}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td>{user.nat}</td>
                      <td>
                        <span className="delete">
                          <FaTrashAlt
                            onClick={() => handleDelete(user)}
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                        <span className="edit">
                          <FaEdit
                            onClick={() => {
                              handleUpdateItem(user);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
