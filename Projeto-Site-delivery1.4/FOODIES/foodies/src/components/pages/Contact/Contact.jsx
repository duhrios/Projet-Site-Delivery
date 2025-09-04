import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <section className="">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="contact-form p-5 shadow-sm bg-white">
                    <h2 className="text-center mb-4">Entre em Contato</h2>
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control custom-input" placeholder="Nome"/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control custom-input" placeholder="Sobrenome"/>
                            </div>
                            <div className="col-12">
                                <input type="email" className="form-control custom-input" placeholder="Endereço de E-mail"/>
                            </div>
                            <div className="col-12">
                                <textarea className="form-control custom-input" rows="5" placeholder="Sua Mensagem"></textarea>
                            </div>
                            <div className="col-12">
                                <butSend className="btn btn-primary w-100 py-3" type="submit">Enviar Mensagem</butSend>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Contact;
