import { useDataService } from "@/app/service/useDataService";
import { BOOKMARK_COLORS } from "@/constants";
import { BookmarkPayload } from "@/model";
import { BookmarkType } from "@prisma/client";
import { Button, Form, Input, Radio, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import styles from "./BookmarkForm.module.scss";

interface Props {
  onSuccess?: () => void;
}
export const BookmarkForm = (props: Props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const { addBookmark } = useDataService();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    const payload: BookmarkPayload = {
      ...values,
      createdBy: 1,
    };
    setLoading(true);
    addBookmark(payload)
      .then(() => {
        api.success({
          message: "Successfully bookmarked!",
          placement: "top",
        });
        onSuccess && onSuccess();
      })
      .catch(() => {
        api.error({
          message: "Oops! something went wrong",
          placement: "top",
        });
      })
      .finally(() => {
        form.resetFields();
        setLoading(false);
      });
  };
  return (
    <>
      {contextHolder}
      <Form name="basic" style={{ maxWidth: 600 }} onFinish={handleSubmit} form={form}>
        <Form.Item name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value={BookmarkType.WORD}>Word</Radio.Button>
            <Radio.Button value={BookmarkType.TERMINOLOGY}>Terminology</Radio.Button>
            <Radio.Button value={BookmarkType.PROVERB}>Proverb</Radio.Button>
            <Radio.Button value={BookmarkType.SLANG}>Slang</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="word" rules={[{ required: true, message: "Please input your bookmark!" }]}>
          <Input placeholder="Bookmark" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Form.List name="usageExamples">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input a sentence or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea placeholder="Usage Example" style={{}} />
                  </Form.Item>
                  <Button onClick={() => remove(field.name)}>Remove</Button>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add("", 0);
                  }}
                  style={{ width: "60%", marginTop: "20px" }}
                >
                  Add example
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
