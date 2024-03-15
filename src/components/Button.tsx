type Props = {
  onClick: () => void;
  name: string;
};
export const Button = ({ onClick, name }: Props) => {
  const onClickHandler = () => {
    onClick();
  };
  return <button onClick={onClickHandler}>{name}</button>;
};
