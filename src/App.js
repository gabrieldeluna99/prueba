import React from "react";
import validator from 'email-validator';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

class App extends React.Component {
  state = {
    form: {
      id: "",
      Usuario: "",
      Password: "",
      Correo: "",
      Estatus: true,
    },
    data: [],
    modalInsertar: false,
    modalEditar: false,
  };

  handelChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    this.setState({
      form: {
        ...this.state.form,
        [name]: newValue,
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
    if (
      this.state.form.Usuario.trim() === "" ||
      this.state.form.Password.trim() === "" ||
      this.state.form.Correo.trim() === ""
    ) {
      alert("Por favor complete todos los campos");
      return;
    }
    
    const isEmailValid = validator.validate(this.state.form.Correo);
    if (!isEmailValid) {
      alert("Por favor ingrese un correo electrónico válido");
      return;
    }
    
    var usuarioNuevo = { ...this.state.form };
    usuarioNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(usuarioNuevo);
    this.setState({ data: lista, modalInsertar: false });
  };
  
  editar = (dato) => {
    if (
      dato.Usuario.trim() === "" ||
      dato.Password.trim() === "" ||
      dato.Correo.trim() === ""
    ) {
      alert("Por favor complete todos los campos");
      return;
    }
    
    const isEmailValid = validator.validate(dato.Correo);
    if (!isEmailValid) {
      alert("Por favor ingrese un correo electrónico válido");
      return;
    }
    
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].Usuario = dato.Usuario;
        lista[contador].Password = dato.Password;
        lista[contador].Correo = dato.Correo;
        lista[contador].Estatus = dato.Estatus;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false });
  };
  

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Esta seguro de eliminar al usuario " + dato.Usuario
    );
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id == dato.id) {
          lista.splice(contador, 1);
        }
        contador++;
      });
    }
    this.setState({ data: lista });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="primary" onClick={() => this.mostrarModalInsertar()}>
            Agrega un usuario nuevo
          </Button>
          <br />
          <br />
          <Table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Usuario</th>
                <th scope="col">Contraseña</th>
                <th scope="col">Correo</th>

                <th scope="col">Estatus</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td scope="row">{elemento.id}</td>
                  <td scope="row">{elemento.Usuario}</td>
                  <td scope="row">{elemento.Password.replace(/./g, '*')}</td>
                  <td scope="row">{elemento.Correo}</td>
                  <td scope="row">{elemento.Estatus ? "Activo" : "Inactivo"}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      Actualizar
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(elemento)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar usuario nuevo</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Usuario:</label>
              <input
                className="form-control"
                type="text"
                name="Usuario"
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Contraseña:</label>
              <input
                className="form-control"
                type="password"
                name="Password"
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                type="email"
                name="Correo"
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
              <label>El usuario se encotrara activo?</label>
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitches"
                name="Estatus"
                checked={this.state.form.Estatus}
                onChange={this.handelChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button color="success" onClick={() => this.insertar()}>
              Ingresar
            </button>
            <button color="danger" onClick={() => this.ocultarModalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Usuario:</label>
              <input
                className="form-control"
                type="text"
                name="Usuario"
                value={this.state.form.Usuario}
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Contraseña:</label>
              <input
                className="form-control"
                type="password"
                name="Password"
                value={this.state.form.Password}
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                type="email"
                name="Correo"
                value={this.state.form.Correo}
                onChange={this.handelChange}
              />
            </FormGroup>

            <FormGroup>
                <input
                  type="checkbox"
                  class="btn-check"
                  id="btn-check-2"
                  name="Estatus"
                  autocomplete="off"
                  checked={this.state.form.Estatus}
                  onChange={this.handelChange}
                />
                <label class="btn btn-primary" for="btn-check-2"> Inactivo? </label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button
              color="success"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </button>
            <button color="danger" onClick={() => this.ocultarModalEditar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
