import { FC, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Button from "../../../../components/button/button";
import Modal from "../../../../components/modal";
import Form from "../../../../components/form/form";
import useForm from "../../../../hooks/useForm";
import Click from "../../../../components/button/click";

const url =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/api";

const SClick = styled(Click)`
  grid-area: button;
`;

const SThanks = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 32px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 300px;
  align-content: center;
`;

const Inquiry: FC = () => {
  const { t } = useTranslation();
  const [open, isOpen] = useState(false);
  const { values, handleChange, clearForm } = useForm({});
  const [sent, isSent] = useState(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await fetch(`${url}/email`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: values.from,
        name: values.name,
        subject: values.subject,
        text: values.text,
      }),
    })
      .then(() => isSent(true))
      .then(() => clearForm());
  };
  return (
    <>
      <SClick onClick={() => isOpen(true)}>
        <Button label={t("home.greeting.button")} />
      </SClick>
      <AnimatePresence>
        {open && (
          <Modal close={() => isOpen(false)}>
            <h1>{t("contact.title")}</h1>
            {sent ? (
              <SThanks>
                <h2>{t("contact.thanks.title")}</h2>
                <p>{t("contact.thanks.text")}</p>
                <Click onClick={() => isSent(false)}>
                  <Button label={t("contact.thanks.again")} />
                </Click>
              </SThanks>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  type="text"
                  label={t("contact.name")}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  type="email"
                  label={t("contact.email")}
                  name="from"
                  value={values.from}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  type="text"
                  label={t("contact.subject")}
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  required
                />
                <Form.Textarea
                  label={t("contact.message")}
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                />
                <Form.Submit>
                  <Button label={t("contact.send")} />
                </Form.Submit>
              </Form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Inquiry;
