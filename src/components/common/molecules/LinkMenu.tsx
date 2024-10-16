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
    <div className="px-5">
      <Text color="gray" size="m" className="py-[18px]">
        {title}
      </Text>
      <div>
        {menuList.map((data, index) => (
          <TextWithArrow key={index} href={data.href}>
            {data.menu}
          </TextWithArrow>
        ))}
      </div>
    </div>
  );
}
