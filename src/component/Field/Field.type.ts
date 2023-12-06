import {
    FieldComponentProps as SourceFieldComponentProps,
    FieldContainerProps as SourceFieldContainerProps,
    FieldContainerPropsKeys as SourceFieldContainerPropsKeys,
} from 'SourceComponent/Field/Field.type';
import { ReactElement } from 'Type/Common.type';

export * from 'SourceComponent/Field/Field.type';

export interface FieldContainerProps extends SourceFieldContainerProps {
    icon?: ReactElement;
}

export interface FieldComponentProps extends SourceFieldComponentProps {
    icon?: ReactElement;
}

export type FieldContainerPropsKeys = SourceFieldContainerPropsKeys | 'icon';
