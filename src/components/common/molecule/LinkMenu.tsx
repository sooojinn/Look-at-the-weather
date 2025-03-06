import Text from '../atom/Text';
import TextWithArrow from '../atom/TextWithArrow';

type MenuItem = {
  menu: string;
  href: string;
};

type PropsType = {
  title: string;
  menuList: MenuItem[];
};

export default function LinkMenu({ title, menuList }: PropsType) {
  return (
    <>
      <Text color="gray" size="m" className="py-4">
        {title}
      </Text>
      <div>
        {menuList.map((data, index) => (
          <TextWithArrow key={index} href={data.href}>
            <Text size="l" weight="medium">
              {data.menu}
            </Text>
          </TextWithArrow>
        ))}
      </div>
    </>
  );
}
