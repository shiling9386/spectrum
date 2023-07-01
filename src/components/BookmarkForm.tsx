import { useDataService } from "@/app/service/useDataService";
import { BookmarkPayload } from "@/model";
import { BookmarkType } from "@prisma/client";
import { Button, Form, Input, Radio, notification } from "antd";
import { useState } from "react";

interface Props {
  onSuccess?: () => void;
}
export const BookmarkForm = (props: Props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const { addBookmark } = useDataService();
  const [api, contextHolder] = notification.useNotification();

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
        setLoading(false);
      });
  };
  return (
    <>
      {contextHolder}
      <Form name="basic" style={{ maxWidth: 600 }} onFinish={handleSubmit}>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value={BookmarkType.WORD}>Word</Radio.Button>
            <Radio.Button value={BookmarkType.TERMINOLOGY}>Terminology</Radio.Button>
            <Radio.Button value={BookmarkType.PROVERB}>Proverb</Radio.Button>
            <Radio.Button value={BookmarkType.SLANG}>Slang</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Bookmark"
          name="word"
          rules={[{ required: true, message: "Please input your bookmark!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
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
                    <Input placeholder="Usage Example" style={{ width: "60%" }} />
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
