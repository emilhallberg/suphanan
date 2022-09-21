import { useTranslation } from 'react-i18next';
import { Lang } from '../utils/enums';

const useLanguage = (): Lang => {
  const { i18n } = useTranslation();
  return i18n.language as Lang;
};

export default useLanguage;
